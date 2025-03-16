import { GlobalStyles, Stack } from "@mui/material";
import { useState } from "react";
import ScoreKeyboard from "./ScoreKeyboard";

const ScoreTable = ({ round, sets, arrows, distance, targetFace }) => {
  const totalRows = Math.ceil(arrows / 3) * sets;

  const testScores = Array(totalRows)
    .fill()
    .map(() => {
      return Array(3).fill(null);
    });

  const [scores, setScores] = useState(testScores);
  const [selectedCell, setSelectedCell] = useState(null);

  const scoreTotal = scores
    .map((r) => r.reduce(addScore, 0))
    .reduce((a, b) => a + b, 0);

  const count = (score) => {
    return scores
      .map((r) => r.filter((s) => s === score).length)
      .reduce((a, b) => a + b, 0);
  };

  return (
    <>
      <Stack>
        <table>
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
              <td colSpan={4}>
                {distance} Round {round}
              </td>
              <td style={{ fontSize: 12 }}>3 arrows subtotal</td>
              <td style={{ fontSize: 12 }}>6 arrow subtotal</td>
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
                          selectedCell?.r === r && selectedCell?.a === a;

                        return (
                          <td
                            key={a}
                            style={{
                              width: 45,
                              background: bgcolor,
                              color: bgcolor === "black" ? "white" : "black",
                              border: isCurrentCell
                                ? "2px solid red"
                                : "1px solid black",
                            }}
                            onClick={() => {
                              setSelectedCell({ r, a });
                            }}
                          >
                            {s}
                          </td>
                        );
                      })}

                    {/* subset subtotal */}
                    <td>{scores?.[r]?.reduce(addScore, 0) ?? 0}</td>

                    {
                      // If current row is even, display the total of the 2 subsets (1 set)
                      isEven ? (
                        <td>
                          {(scores?.[r]?.reduce(addScore, 0) ?? 0) +
                            (scores?.[r - 1]?.reduce(addScore, 0) ?? 0)}
                        </td>
                      ) : (
                        // if odd , display black cell
                        <td style={{ background: "black" }}>&nbsp;</td>
                      )
                    }
                  </tr>
                );
              })}

            <tr>
              <td colSpan={5} style={{ textAlign: "left" }}>
                <Stack direction="row" gap={1} width="100%" px={0.5}>
                  <span>X&apos;s: {count("X")}</span>
                  <span>10&apos;s: {count(10)}</span>
                  <span style={{ marginLeft: "auto" }}>Total</span>
                </Stack>
              </td>
              <td>{scoreTotal}</td>
            </tr>
          </tbody>
        </table>
        <span style={{ fontSize: 12 }}>Last Modified: </span>
      </Stack>
      <ScoreKeyboard visibility={selectedCell !== null} />
    </>
  );
};

function getScoreColor(score) {
  switch (score) {
    case "X":
    case 10:
    case 9:
      return "yellow";
    case 8:
    case 7:
      return "red";
    case 6:
    case 5:
      return "blue";
    case 4:
    case 3:
      return "black";
    case "M":
      return "grey";
    default:
      return "white";
  }
}

function addScore(a, b) {
  return getRealScore(a) + getRealScore(b);
}

function getRealScore(score) {
  switch (score) {
    case "X":
      return 10;
    case "M":
      return 0;
    default:
      return score;
  }
}

export default ScoreTable;
