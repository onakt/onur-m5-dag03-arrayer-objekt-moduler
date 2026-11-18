# Dag 3 · Arrayer, objekt och moduler

*Modul 5, UI/UX & Frontendutveckling (TypeScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du lär dig lagra data i **arrayer** och **objekt**, bearbeta den med `filter`, `map`, `find`, `sort` och `reduce`, och dela upp koden i **moduler** med `import` och `export`. Du skriver nio funktioner som arbetar med kaféets meny, och testsidan talar om när de fungerar.

## Bakgrund

Igår lärde du dig funktioner och loopar. Nästan all riktig kod handlar om **listor av saker**: rätter, användare, produkter, inlägg. I JavaScript är en lista en *array* och en sak är ett *objekt*. Menyn på Kafé Kardemumma ligger idag hårdkodad i HTML. Idag flyttar den in i data, så att koden kan filtrera, sortera och räkna på den. Det är första steget mot en sida som byggs av data.

## TypeScript idag: interface, union och valfria egenskaper

Menyn är en lista av objekt. I TypeScript beskriver du hur ett objekt ser ut med en **interface**. Den ligger färdig i `src/typer.ts`:

```ts
export type Kategori = "bakverk" | "dryck" | "lunch";   // union: bara dessa tre texter

export interface Ratt {
  id: number;
  namn: string;
  pris: number;
  kategori: Kategori;
  vegetarisk: boolean;
  bild?: string;            // ? betyder valfri
}
```

- `Ratt[]` betyder "lista av Ratt".
- `Ratt | undefined` betyder att en funktion antingen ger en rätt eller `undefined` (som `hittaRatt`). TypeScript tvingar dig att hantera båda.
- `kopp.storlek = "stor"` ger ett typfel om objektet inte har beskrivits med en valfri `storlek?: string`. I JavaScript går det tyst.
- `import type { Ratt } from "./typer"` hämtar bara typen. Den försvinner när koden körs.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code.
3. **Installera verktygen, en gång per repo:** `npm install` i terminalen.
4. **Starta servern:** `npm run dev`. Öppna adressen den skriver ut (oftast `http://localhost:5173/`). Tryck F12 och välj fliken *Console*. Stoppa med Ctrl+C. Testsidan öppnar du på samma server: `http://localhost:5173/tests.html` (lägg till `/tests.html` efter adressen).
5. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
6. **Kontrollera typerna:** `npm run typecheck`. Tyst betyder att alla typer stämmer. Röda understrykningar i VS Code är TypeScript som varnar.
7. **Skicka upp** när du är klar: `git push`.
8. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass. Problem med `npm` eller Node? Läs *Elevguide: Node, Vite och TypeScript*.

> Vite tar bara bort typerna och kör koden. Den kontrollerar dem inte. Sidan kan alltså köras trots röda understrykningar.

## Uppgiften steg för steg

### Steg 1. Arrayer i Console

Öppna `src/main.ts` och gör uppgift 1: skapa en array med drycker, lägg till och ta bort värden med `push` och `pop`, och använd `indexOf`, `includes` och `join`. Kontrollera i Console. Kör `npm run dev`. Moduler fungerar inte om du dubbelklickar på filen.

### Steg 2. Objekt i Console

Uppgift 2 i `src/main.ts`: skapa ett objekt, läs egenskaper med punkt och hakparenteser, ändra och lägg till egenskaper och skriv ut `Object.keys(kopp)`. Skriv med egna ord i en kommentar när du använder punkt och när du använder hakparenteser.

### Steg 3. Arrayer av objekt

Uppgift 3: `src/data.ts` exporterar kaféets meny som en array av åtta objekt. Importera den och skriv ut antalet, den första rätten, och loopa med `for...of`. Titta noga på hur `src/data.ts` är uppbyggd. Commit: `git commit -m "Dag 3: arrayer och objekt"`.

### Steg 4. Öppna testsidan

Öppna `tests.html` på servern (`http://localhost:5173/tests.html`). De flesta tester är röda. Läs `src/tests.ts`: vad förväntas av `vegetariskaRatter`? Skriv en gissning i en kommentar i `src/meny.ts` om vilken array-metod som passar innan du börjar.

### Steg 5. filter och map

I `src/meny.ts`: skriv `vegetariskaRatter` (filter), `rattNamn` (map) och `prislista` (map som använder `formateraPris` importerad från `src/pris.ts`). Ladda om testsidan efter varje funktion. Commit när de tre är gröna.

### Steg 6. find och reduce

Skriv `hittaRatt` (find) och `billigast` (reduce). Tänk på tom lista: vad ska `billigast([])` ge? Läs testet. Om reduce känns svårt: skriv först en vanlig `for`-loop som gör samma sak, och skriv sedan om den.

### Steg 7. sort utan att förstöra originalet

Skriv `sorteraEfterPris`. `sort` *ändrar* arrayen den körs på, så du måste kopiera först med `[...meny]`. Ett av testerna kontrollerar att originalet är intakt. Provoka felet med flit (ta bort kopieringen) och se testet bli rött.

### Steg 8. reduce på riktigt: totalpris och antal per kategori

Skriv `totalPris(order, meny)` och `perKategori(meny)`. `perKategori` ska bygga ett objekt som `{ bakverk: 3, dryck: 2, lunch: 3 }`. Ta det i små steg och skriv ut mellanresultat med `console.log` inuti `reduce`.

### Steg 9. Ändra utan att ändra: medNyttPris

Skriv `medNyttPris(ratt, nyttPris)`. Den ska returnera en *kopia* med nytt pris, och originalet får inte ändras. Använd spread: `{ ...ratt, pris: nyttPris }`. Förklara i en kommentar varför det är bättre än att skriva `ratt.pris = nyttPris`.

### Steg 10. Moduler på riktigt

Skapa en ny fil `src/rabatt.ts` med en exporterad funktion `studentPris(pris)` (10 % rabatt). Importera den i `src/main.ts` och använd den på menyn. Prova sedan tre fel med flit och läs felen: ta bort `type="module"` i `index.html`, skriv fel filnamn i `import`, och öppna `index.html` genom att dubbelklicka (utan servern). Skriv vad varje fel betydde.

1. **`type="module"` saknas**: Uncaught SyntaxError: import declarations may only appear at top level of a module. Betyder att jag försöker använda import i ett script som webbläsaren inte behandlar som en modul.
2. **Fel filnamn i import**: Error: Cannot find module './rabat.ts' or its corresponding type declarations. Typescript hittar inte filen som jag försöker importera.
3. **Öppna index.html utan server**: Cross-Origin begäran blockerad: Same-Origin policyn tillåter inte läsningar av fjärresurs på file:///src/main.ts. (Orsak: CORS begäran inte http). Moduler fungerar bara via en server(Live Server). Dubbelklick på filen gerett CORS-fel. Det betyder att webbläsaren blockerar försöket att läsa en fil direkt från datorns filsystem.


## Kontrollista: så vet du att du är klar

- [X] Alla 17 tester på `tests.html` är gröna.
- [X] `src/main.ts` skriver ut rätt i Console för uppgift 1–3.
- [X] Du använder `filter`, `map`, `find` och `reduce` och kan förklara när du väljer vilken.
- [X] `sorteraEfterPris` och `medNyttPris` ändrar inte originalet.
- [ ] `src/rabatt.ts` exporteras och importeras, och du har sett de tre felmeddelandena.
- [ ] Du har gjort minst sex commits med beskrivande meddelanden.

## Tips om du fastnar

- `undefined` i testet? Du glömde `return`, eller så skrev du `{ ... }` med klamrar i en pilfunktion utan `return`.
- `x.map is not a function` betyder att `x` inte är en array. Skriv ut `typeof x` och `x`.
- `reduce` får två saker: en funktion och ett startvärde. Startvärdet är ofta `0` eller `{}`.
- `Failed to resolve module specifier` eller `Cannot use import statement outside a module`: kontrollera `type="module"`, sökvägen (`./meny`) och att `npm run dev` körs.
- `does not provide an export named` betyder att namnet i `import { ... }` inte matchar `export` i den andra filen.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Reflektion: Vilken array-metod (`filter`, `map`, `find`, `reduce`, `sort`) kändes mest naturlig, vilken svårast, och hur skulle du förklara skillnaden mellan `map` och `filter` för en kamrat? Och vad gör en `interface` bättre än att bara skriva objektet rakt av?

## Vill du mer? (frivilligt)

- Skriv `rattMedHögstPris(meny)` utan att använda `sort`.
- Skriv `gruppera(meny)` som returnerar `{ bakverk: [...rätter], dryck: [...], lunch: [...] }`.
- Läs om `some` och `every` på MDN och skriv en funktion som svarar på "finns det något glutenfritt?".
