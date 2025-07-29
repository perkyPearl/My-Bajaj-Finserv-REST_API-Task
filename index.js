const express = require("express");
const app = express();

app.use(express.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  const response = {
    user_id: "pearl_08032004",
    email: "pearl648.be22@chitkara.edu.in",
    roll_number: "2210990648",
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0,
    concat_string: "",
  };

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ is_success: false, ...response });
  }

  data.forEach((item) => {
    const val = item.toString();

    let isNumber = true;
    for (let ch of val) {
      if (ch < "0" || ch > "9") {
        isNumber = false;
        break;
      }
    }

    if (isNumber) {
      const num = Number(val);
      if (num % 2 === 0) response.even_numbers.push(val);
      else response.odd_numbers.push(val);
      response.sum += num;
    } else {
      for (let ch of val) {
        if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
          response.alphabets.push(ch.toUpperCase());
        } else {
          response.special_characters.push(ch);
        }
      }
    }
  });

  const rev = [...response.alphabets].reverse();
  rev.forEach((ch, i) => {
    response.concat_string += i % 2 === 0 ? ch : ch.toLowerCase();
  });

  response.sum = String(response.sum);
  return res.json({ is_success: true, ...response });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
