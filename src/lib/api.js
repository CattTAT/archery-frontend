import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default instance;


export function getScoresheetsByArcherId() {
  return instance.get("/scoresheets", {
    params: {
      archerId: localStorage.getItem("userId"),
    },
  }).then((res) => res.data)
}

export function getScoresetByScoresheetId(scoresheetId, roundSeq) {
  return instance.get("/scoreset", {
    params: {
      scoresheetId: scoresheetId,
      roundSeq: roundSeq
    }
  }).then((res) => res.data)
}

export function getArrowsByScoresetId(scoresetId) {
  return instance.get("/arrows", {
    params: {
      scoresetId: scoresetId
    }
  }).then((res) => res.data)
}