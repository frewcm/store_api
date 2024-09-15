export default function notFound(req, res) {
  return res.status(404).json({ msg: "ROUTE NOT FOUND" });
}
