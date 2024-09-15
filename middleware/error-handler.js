export default function errorHandler(err, req, res, next) {
  console.log(err.message);
  return res.status(500).json({ msg: err.message });
}
