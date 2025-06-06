import { GlobalStyles, Stack } from "@mui/material";
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import ScoreKeyboard from "./ScoreKeyboard";
import instance from "../lib/api";
import { getRealScore, getScoreColor } from "../lib/utils";

const ScoreTable = (
  {
    scoresheetId,
    round,
    sets,
    arrows,
    distance,
    targetFace,
    lastModified,
    status,
  },
  ref
) => {
  const totalRows = Math.ceil(arrows / 3) * sets;

  const scoreTemplates = Array(totalRows)
    .fill()
    .map(() => {
      return Array(3).fill(null);
    });

  const locationTemplates = Array(totalRows)
    .fill()
    .map(() => {
      return Array(3).fill(Array(2).fill(null));
    });

  const [scoresetId, setScoresetId] = useState(null);
  const [scores, setScores] = useState(scoreTemplates);
  const [arrowLocations, setArrowLocations] = useState(locationTemplates);
  const [arrowDetails, setArrowDetails] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const tableRef = useRef(null);
  const keyboardRef = useRef(null);


  const getScoresetId = async (scoresheetId, round) => {
    const data = await instance.get("/scoreset", {
      params: {
        scoresheetId: scoresheetId,
        roundSeq: round,
      },
    });
    setScoresetId(data.data.map((scoreset) => scoreset.id));
  };

  const getArrowDetails = async (scoresetId) => {
    const data = await instance.get("/arrows", {
      params: {
        scoresetId: scoresetId,
      },
    });

    // Ensure the latest result of duplicates is kept
    setArrowDetails((prevScoreDB) => {
      const updatedScoreDB = [...prevScoreDB];
      const newScores = data.data;

      newScores.forEach((newScore) => {
        const existingIndex = updatedScoreDB.findIndex(
          (score) => score.id === newScore.id // Assuming `id` is the unique identifier
        );

        if (existingIndex !== -1) {
          // Replace the existing entry with the latest one
          updatedScoreDB[existingIndex] = newScore;
        } else {
          // Add the new entry if it doesn't exist
          updatedScoreDB.push(newScore);
        }
      });

      return updatedScoreDB;
    });
  };

  useEffect(() => {
    if (!scoresheetId || !round) return;
    getScoresetId(scoresheetId, round);
  }, [scoresheetId, round]);

  useEffect(() => {
    if (!scoresetId || scoresetId.length === 0) return;
    // must run one by one
    (async () => {
      for (const setId of scoresetId) {
        await getArrowDetails(setId);
      }
    })()
  }, [scoresetId]);

  useEffect(() => {
    if (arrowDetails.length === 0) return;
    setScores((scores) => {
      let arrowNumber = 0;
      const tempScore = [...scores];
      for (let i = 0; i < scores.length; i++) {
        for (let j = 0; j < scores[i].length; j++) {
          switch (arrowDetails[arrowNumber]?.score) {
            case "X":
            case "M":
            case null:
              tempScore[i][j] = arrowDetails[arrowNumber]?.score;
              break;
            default:
              tempScore[i][j] =
                parseInt(arrowDetails[arrowNumber]?.score, 10) || null;
              break;
          }
          arrowNumber++;
        }
      }
      return tempScore;
    });
  }, [arrowDetails]);

  const onClickNextCell = () => {
    const { row, col } = selectedCell;
    if (scores[row][col] === null) return;
    if (col < 2) {
      setSelectedCell({ row, col: col + 1 });
    } else if (row < totalRows - 1) {
      setSelectedCell({ row: row + 1, col: 0 });
    }
  };

  const onClickPreviousCell = () => {
    const { row, col } = selectedCell;
    if (col > 0) {
      setSelectedCell({ row, col: col - 1 });
    } else if (row > 0) {
      setSelectedCell({ row: row - 1, col: 2 });
    }
  };

  const sort = (tempScore, row) => {
    const rowsPerRound = arrows / 3;
    const currentRound = Math.floor(row / rowsPerRound);
    const startRow = currentRound * rowsPerRound;
    const endRow = startRow + rowsPerRound;
    const scoreToSort = tempScore.slice(startRow, endRow);

    // Flatten the 2D array
    const flattenedArray = scoreToSort.flat();

    // Sort the flattened array in descending order
    const sortedArray = flattenedArray.sort((a, b) => {
      const scoreValue = (score) => {
        switch (score) {
          case "X":
            return 11;
          case "M":
            return 0;
          case null:
            return -1;
          default:
            return score;
        }
      };
      return scoreValue(b) - scoreValue(a);
    });

    // Reshape the sorted array back into a 2D array
    const sortedArray2D = [];
    for (let i = 0; i < scoreToSort.length; i++) {
      sortedArray2D.push(sortedArray.splice(0, scoreToSort[i].length));
    }

    // Replace the original scores with the sorted scores
    for (let i = startRow; i < endRow; i++) {
      for (let j = 0; j < 3; j++) {
        tempScore[i][j] = sortedArray2D[i - startRow][j];
      }
    }

    return tempScore;
  };

  const recordScore = (score) => {
    setScores((prev) => {
      const newScores = [...prev];
      newScores[selectedCell.row][selectedCell.col] = score;
      return sort(newScores, selectedCell.row);
    });
  };

  const onClickBackspace = () => {
    const { row, col } = selectedCell;
    if (scores[row][col] !== null) {
      recordScore(null);
    } else if (col > 0) {
      setSelectedCell({ row, col: col - 1 });
    } else if (row > 0) {
      setSelectedCell({ row: row - 1, col: 2 });
    }
  };

  const scoreTotal = scores
    .map((r) => r.reduce(addScore, 0))
    .reduce((a, b) => a + b, 0);

  const count = (score) => {
    return scores
      .map((r) => r.filter((s) => s === score).length)
      .reduce((a, b) => a + b, 0);
  };

  const handleCellClick = (row, col) => {
    if (status === 1) return;
    if (scores[row][col] !== null) {
      setSelectedCell({ row, col });
    } else {
      let found = false;
      // If no empty cell found in the current round, find the first empty cell in the nearest rounds
      for (let r = 0; r < totalRows; r++) {
        for (let c = 0; c < 3; c++) {
          if (scores[r][c] === null) {
            setSelectedCell({ row: r, col: c });
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.dataset.display === "true") {
      setSelectedCell(null);
    }
    if (
      tableRef.current &&
      !tableRef.current.contains(event.target) &&
      !(keyboardRef.current && keyboardRef.current.contains(event.target))
    ) {
      setSelectedCell(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      arrowId: arrowDetails.map((arrow) => arrow.id),
      scoresetId: scoresetId,
      scores: scores.flat(2),
      arrowLocations: arrowLocations.flat(1),
    }),
    [scores, scoresetId, arrowDetails, arrowLocations]
  );

  return (
    <Stack>
      <table ref={tableRef}>
        <GlobalStyles
          styles={{
            "table, th, td": {
              borderCollapse: "collapse",
              border: "1px solid black",
              fontSize: 24,
            },
            td: {
              textAlign: "center",
              minHeight: 35,
            },
          }}
        />
        <thead>
          <tr>
            <td data-display={true} colSpan={4}>
              {distance}M Round {round}
            </td>
            <td data-display={true} style={{ fontSize: 12 }}>
              3 arrows subtotal
            </td>
            <td data-display={true} style={{ fontSize: 12 }}>
              6 arrow subtotal
            </td>
          </tr>
        </thead>
        <tbody>
          {Array(totalRows)
            .fill()
            .map((_, r) => {
              const isEven = (r + 1) % 2 === 0;
              const currentSubset = (r + 1) * 3;
              const headerText =
                currentSubset < 10 ? `0${currentSubset}` : currentSubset;

              return (
                <tr key={r}>
                  {/* row header */}
                  <td
                    data-display={true}
                    style={{
                      background: "#E0E0E0",
                      width: 45,
                    }}
                  >
                    {headerText}
                  </td>

                  {/* scores */}
                  {Array(3)
                    .fill()
                    .map((_, a) => {
                      const s = scores?.[r]?.[a] ?? "-";
                      const bgcolor = getScoreColor(s);
                      const isCurrentCell =
                        selectedCell?.row === r && selectedCell?.col === a;

                      return (
                        <td
                          key={a}
                          data-row={r}
                          data-col={a}
                          data-display={false}
                          style={{
                            width: 45,
                            background: bgcolor,
                            color: bgcolor === "black" ? "white" : "black",
                            border: isCurrentCell
                              ? "2px solid red"
                              : "1px solid black",
                          }}
                          onClick={() => handleCellClick(r, a)}
                        >
                          {s}
                        </td>
                      );
                    })}

                  {/* subset subtotal */}
                  <td data-display={true}>
                    {scores?.[r]?.reduce(addScore, 0) ?? 0}
                  </td>

                  {
                    // If current row is even, data-display the total of the 2 subsets (1 set)
                    isEven ? (
                      <td data-display={true}>
                        {(scores?.[r]?.reduce(addScore, 0) ?? 0) +
                          (scores?.[r - 1]?.reduce(addScore, 0) ?? 0)}
                      </td>
                    ) : (
                      // if odd , data-display black cell
                      <td data-display={true} style={{ background: "black" }}>
                        &nbsp;
                      </td>
                    )
                  }
                </tr>
              );
            })}

          <tr>
            <td data-display={true} colSpan={5} style={{ textAlign: "left" }}>
              <Stack direction="row" gap={1} width="100%" px={0.5}>
                <span>X&apos;s: {count("X")}</span>
                <span>10&apos;s: {count(10)}</span>
                <span style={{ marginLeft: "auto" }}>Total</span>
              </Stack>
            </td>
            <td data-display={true}>{scoreTotal}</td>
          </tr>
        </tbody>
      </table>
      <span style={{ fontSize: 12 }}>Last Modified: {lastModified} </span>
      <ScoreKeyboard
        visibility={selectedCell !== null}
        targetFace={targetFace}
        onClickNextCell={onClickNextCell}
        onClickPreviousCell={onClickPreviousCell}
        setSelectedCell={setSelectedCell}
        recordScore={recordScore}
        onClickBackspace={onClickBackspace}
        ref={keyboardRef}
      />
    </Stack>
  );
};


function addScore(a, b) {
  return getRealScore(a) + getRealScore(b);
}


export default forwardRef(ScoreTable);
