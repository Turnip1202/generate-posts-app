
const gTemplate = (title, currentDate, description, tags, category, draft) =>
  `---

title: ${title}

published: ${currentDate}

description: ${description}

tags: [${tags.join(', ')}]

category: ${category || ''}

draft: ${draft}

---
`
module.exports = gTemplate