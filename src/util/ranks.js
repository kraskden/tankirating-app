
const ranks = [
  {
    "rank": "Новобранец",
    "score": 0
  },
  {
    "rank": "Капрал",
    "score": 1500
  },
  {
    "rank": "Мастер-капрал",
    "score": 3700
  },
  {
    "rank": "Ефрейтор",
    "score": 500
  },
  {
    "rank": "Сержант",
    "score": 7100
  },
  {
    "rank": "Мастер-сержант",
    "score": 20000
  },
  {
    "rank": "Сержант-майор",
    "score": 41000
  },
  {
    "rank": "Рядовой",
    "score": 100
  },
  {
    "rank": "Уорэнт-офицер1",
    "score": 57000
  },
  {
    "rank": "Первый сержант",
    "score": 29000
  },
  {
    "rank": "Штаб-сержант",
    "score": 12300
  },
  {
    "rank": "Уорэнт-офицер 3",
    "score": 98000
  },
  {
    "rank": "Уорэнт-офицер2",
    "score": 76000
  },
  {
    "rank": "Уорэнт-офицер4",
    "score": 125000
  },
  {
    "rank": "Уорэнт-офицер 5",
    "score": 156000
  },
  {
    "rank": "Младший лейтенант",
    "score": 192000
  },
  {
    "rank": "Старший лейтенант",
    "score": 280000
  },
  {
    "rank": "Лейтенант",
    "score": 233000
  },
  {
    "rank": "Капитан",
    "score": 332000
  },
  {
    "rank": "Майор",
    "score": 390000
  },
  {
    "rank": "Подполковник",
    "score": 455000
  },
  {
    "rank": "Полковник",
    "score": 527000
  },
  {
    "rank": "Генерал-майор",
    "score": 692000
  },
  {
    "rank": "Бригадир",
    "score": 606000
  },
  {
    "rank": "Маршал",
    "score": 1000000
  },
  {
    "rank": "Командор",
    "score": 1255000
  },
  {
    "rank": "Легенда",
    "score": 1600000
  },
  {
    "rank": "Генералиссимус",
    "score": 1400000
  },
  {
    "rank": "Генерал",
    "score": 889000
  },
  {
    "rank": "Фельдмаршал",
    "score": 1122000
  },
  {
    "rank": "Генерал-лейтенант",
    "score": 787000
  }
].sort((a, b) => a.score - b.score)

export const getRank = (score) => {
  for (let idx = 0; idx < ranks.length; ++idx) {
    let rank = ranks[idx]
    if (rank.score > score) {
      return ranks[idx - 1].rank
    }
  }
  return "Легенда " + (Math.floor((score - 1600000) / 200000) + 1)
}

export const getRankPercent = (score) => {
  if (score >= 1600000) {
    return Math.floor(((score - 1600000) % 200000) / 2000)
  }
  let prev, next;
  for (let idx = 0; idx < ranks.length; ++idx) {
    let rank = ranks[idx]
    if (rank.score > score) {
      prev = ranks[idx - 1].score
      next = rank.score
      break;
    }
  }
  return Math.floor((score - prev) / (next - prev) * 100)
}