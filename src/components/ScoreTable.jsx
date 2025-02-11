import { GlobalStyles } from "@mui/material";

const testScores = [
  ["X", 10, 10],
  [9, 8, "M"],
  [8, 7],
];

const ScoreTable = ({
  scores = testScores,
  subsets = 10,
  arrows = 3,
  type = "18M",
}) => {
  return (
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
          <td colSpan={arrows + 1}>{type} Round 1</td>
          <td style={{ fontSize: 12 }}>{arrows} arrows subtotal</td>
          <td style={{ fontSize: 12 }}>{arrows * 2} arrow subtotal</td>
        </tr>
      </thead>
      <tbody>
        {Array(subsets)
          .fill()
          .map((_, r) => {
            const isEven = (r + 1) % 2 === 0;
            const currentSubset = (r + 1) * arrows;
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
                {Array(arrows)
                  .fill()
                  .map((_, a) => {
                    const s = scores?.[r]?.[a] ?? "-";
                    const bgcolor = getScoreColor(s);

                    return (
                      <td
                        key={a}
                        style={{
                          width: 45,
                          background: bgcolor,
                          color: bgcolor === "black" ? "white" : "black",
                        }}
                      >
                        {s}
                      </td>
                    );
                  })}

                {/* subset subtotal */}
                <td>{scores?.[r]?.reduce(scoreSum, 0) ?? 0}</td>

                {
                  // If current row is even, display the total of the 2 subsets (1 set)
                  isEven ? (
                    <td>
                      {(scores?.[r]?.reduce(scoreSum, 0) ?? 0) +
                        (scores?.[r - 1]?.reduce(scoreSum, 0) ?? 0)}
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
          <td colSpan={arrows + 2}>Total</td>
          <td>
            {scores
              .map((r) => r.reduce(scoreSum, 0))
              .reduce((a, b) => a + b, 0)}
          </td>
        </tr>
      </tbody>
    </table>
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

function scoreSum(a, b) {
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
