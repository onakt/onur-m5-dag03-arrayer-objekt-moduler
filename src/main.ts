// Dag 3, del 1: Arrayer och objekt i Console.
import { meny } from "./data.ts";
import { studentPris } from "./rabatt.ts";

// UPPGIFT 1: arrayer
// a) skapa const drycker: string[] = ["Bryggkaffe", "Latte", "Te"];
const drycker: string[] = ["Bryggkaffe", "Latte", "Te"];
// b) lägg till "Chai" sist med push. Skriv ut listan och längden.
drycker.push("Chai");
console.log(drycker, drycker.length);
// c) ta bort sista med pop och skriv ut vad som togs bort.
drycker.pop();
console.log(drycker);
console.log("Chai togs bort!");
// d) skriv ut platsen för "Latte" (indexOf) och om "Cola" finns (includes).
console.log(drycker.indexOf("Latte"));
console.log(`Finns Cola: ${drycker.includes("cola") ? "Ja" : "Nej"}`);
// e) skriv ut hela listan som en text: drycker.join(", ")
console.log(drycker.join(", "));


// UPPGIFT 2: objekt
// a) skapa const kopp = { namn: "Latte", pris: 45, vegetarisk: true };
const kopp: Kopp = { namn: "Latte", pris: 45, vegetarisk: true };
// b) skriv ut kopp.namn och kopp["pris"]
console.log(kopp.namn, kopp["pris"]);
// c) ändra priset till 48, och lägg till egenskapen storlek: "stor"
kopp.pris = 48;
kopp.storlek = "stor";
//    TypeScript klagar på storlek. Beskriv objektet med en interface där storlek är valfri (storlek?: string).
interface Kopp {
    namn: string;
    pris: number;
    vegetarisk: boolean;
    storlek?: string;
}
// d) skriv ut Object.keys(kopp)
console.log(Object.keys(kopp));
// Punktnotation för direkta property-namn, hakparenteser när du vill använda en variabel för att bestämma vilken property du ska komma åt


// UPPGIFT 3: arrayer av objekt
// a) skriv ut hur många rätter menyn har och namnet på den första
console.log(meny.length, meny[0].namn);
// b) loopa med for...of och skriv ut "namn – pris kr" för varje rätt
for (const ratt of meny) {
    console.log(`${ratt.namn} – ${ratt.pris} kr`);
}
// c) skriv ut namnet på den sista rätten utan att veta antalet (tips: length - 1)
console.log("Sista rätten: " + meny[meny.length-1].namn);

// STEG 10: Använd den importerade funktionen `studentpris(pris)` i menyn
console.log(meny);
console.log(meny.map(ratt => {
    return {...ratt, pris: Number(studentPris(ratt.pris).toFixed(2))};
}));