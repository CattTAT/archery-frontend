import axios from "axios";

const instance = axios.create({
  baseURL: "http://152.42.246.207:2425",
});

export default instance;

export const model = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export function getScoresheetsByArcherId() {
  return instance
    .get("/scoresheets", {
      params: {
        archerId: localStorage.getItem("userId"),
      },
    })
    .then((res) => res.data);
}

export function getScoresetByScoresheetId(scoresheetId, roundSeq) {
  return instance
    .get("/scoreset", {
      params: {
        scoresheetId: scoresheetId,
        roundSeq: roundSeq,
      },
    })
    .then((res) => res.data);
}

export function getArrowsByScoresetId(scoresetId) {
  return instance.get("/arrows", {
    params: {
      scoresetId: scoresetId
    }
  }).then((res) => res.data)
}

export function getArcher(archerId) {
  return instance.get('/archers/' + archerId).then((res) => res.data)
}