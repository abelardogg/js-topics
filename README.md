# js-topics

Practica de fundamentos: JavaScript, React y TypeScript. El plan completo esta en
[plan-estudio-frontend.md](plan-estudio-frontend.md).

## Sesiones

| # | Tema | Stack | Estado |
|---|---|---|---|
| 01 | [Scope y closures](01-scope-closures/) | Node + `node:test` | 🟡 En curso |
| 02 | Modelo de render de React | Vite + Vitest + Testing Library | ⬜ Pendiente |
| 03 | Hooks a fondo | Vite + Vitest + Testing Library | ⬜ Pendiente |
| 04 | TypeScript practico | `tsc --noEmit` + tests runtime | ⬜ Pendiente |
| 05 | Simulacro de evaluacion de codigo | Markdown | ⬜ Pendiente |

Leyenda: ⬜ pendiente · 🟡 en curso · ✅ en verde

## Como trabajar

```bash
npm test          # corre todas las sesiones de Node
npm run test:01   # solo la sesion 01
npm run test:01:watch
```

Reglas:

- Solo edito el archivo `exercises.js` (o `.tsx`) de la sesion.
- Los tests empiezan en rojo. No se tocan.
- Al terminar escribo `NOTES.md` con lo que aprendi.
- Sin IA mientras resuelvo. Si me atoro, pido **una pista**.
