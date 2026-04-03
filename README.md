# Coal Technologies LLC — Вэбсайт

Монголын нүүрсний уурхайнуудын нэгдсэн мэдээллийн платформ.

## Ажиллуулах заавар

### 1. Шаардлага
- Node.js (v18+) суулгасан байх — https://nodejs.org

### 2. Суулгах
```bash
npm install
```

### 3. Хөгжүүлэлтийн горимоор ажиллуулах (localhost)
```bash
npm run dev
```
Дараа нь `http://localhost:5173` дээр нээнэ.

### 4. Build хийх (production)
```bash
npm run build
```
`dist/` хавтас дотор бэлэн файлууд үүснэ.

---

## Вэбсайт байршуулах (Deploy)

### Арга 1: Vercel (Хамгийн хялбар, ҮНЭГҮЙ)
1. https://vercel.com дээр GitHub-аар бүртгүүлэх
2. Энэ фолдерыг GitHub repo болгон push хийх
3. Vercel дээр "New Project" → GitHub repo-гоо сонгох
4. Автоматаар deploy болно
5. `coal-technologies.vercel.app` гэсэн домэйн авна

### Арга 2: Netlify (ҮНЭГҮЙ)
1. https://netlify.com дээр бүртгүүлэх
2. `npm run build` гүйцэтгэх
3. `dist/` фолдерыг Netlify руу чирэх (drag & drop)
4. Бэлэн!

### Арга 3: Өөрийн домэйн
1. Vercel эсвэл Netlify дээр deploy хийсний дараа
2. Settings → Domains → Өөрийн домэйн нэмэх
3. DNS тохиргоо хийх (A record эсвэл CNAME)

---

## Холбоо барих
- **CEO:** Б. Дэмбэрэл — 86823646
- **Engineer:** Б. Алтанхундага — 85443201
- **Email:** coaltechnologiesllc@must.edu.mn
