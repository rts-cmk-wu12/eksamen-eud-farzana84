# Dokumentation for SwapHub – en web-app til loppe enthusiaster
 Navn : Farzana Zaman 
 Hold: WU12

### Valgfi Opgave: 
Jeg har lavet Valgfri Opgave C - Opret bruger

##### URL til GitHub repository : 
[https://github.com/rts-cmk-wu12/eksamen-eud-farzana84](https://github.com/rts-cmk-wu12/eksamen-eud-farzana84)
# Sådan kommer du i gang  
### Kør Api
- `npm install`
- `npm start`
### Kør Swaphub App
- `npm install`
- `npm run dev`
 
 ## Tech Stack 

* **Next.js**
Next.js er et React-baseret framework. Jeg har valgt Next.js som mit framework, fordi det gør muligt at bygge både frontend og backend i samme projekt og kombinerer React med en masse ekstra funktioner:  
- Mappe-baseret routing – opret en fil, og du har en ny side.  
- Server-side komponenter og actions – koden kører på serveren, hvilket giver bedre sikkerhed.
- Hurtigere sider og bedre SEO, fordi Next.js optimerer automatisk.  
- Fast Refresh – jeg ser ændringer med det samme, når jeg koder.  
- Nem hosting på Vercel, Netlify eller egen server.
En ulempe kan være, at serveren kan blive presset ved mange requests.

* **React**
React er et JavaScript-bibliotek. Jeg har valgt React, fordi react-komponenter kan genbruges i hele projektet, hvilket gør min kode mere overskuelig og effektiv.

* **Git**  
Et versionsstyringsværktøj, som lader mig lave branches og versioner af min kode, så jeg let kan gå tilbage til tidligere versioner, hvis jeg for eksempel har lavet en fejl. Jeg bruger Git sammen med GitHub.

* **TailwindCSS**
Et utility-baseret mobile-first CSS bibliotek. Jeg har brugt det, fordi jeg kan skrive små utility-klasser direkte i koden uden at lave store CSS-filer.  

* **React-Icons** 
Et ikon-bibliotek, som er beregnet på React. Jeg har brugt React-icons, fordi det gør super let at bruge ikoner. I stedet for selv at hente SVGer, kan jeg importere et ikon som en komponent.   

* **Zod** 
Et TypeScript-first valideringsbibliotek, som fungerer rigtig godt med Next.js og React. Jeg bruger Zod til at validere bruger-input fra formularer, fordi, i stedet for en masse conditional statements med forvirrende regex osv. kan man hurtigt og simpelt validere med Zod og sende fejlbeskeder nemt tilbage til brugeren.

## Kode-eksempel
signUpAction (components/forms/SignUpForm/signUpAction.js)
```jsx
"use server";
import { z } from "zod";
export async function signUpAction(prevState, formData) {
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const email = formData.get("email");
    const password = formData.get("password");
   const schema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
    const validated = schema.safeParse({
        firstname, lastname, email, password
    });

    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    };
   const baseUrl = process.env.API_BASE_URL;
    try {
     const response = await fetch(`${baseUrl}/users`,{
       method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
      "email": validated.data.email,
      "password": validated.data.password,
      "firstname": validated.data.firstname,
      "lastname": validated.data.lastname
    }),
     });
        if (!response.ok) {
        const errorData = await response.json().catch(()=> null);
        return {
            success: false,
            errors: [errorData?.message || 'Sign up failed, please try again']
        };
    }
     const data = await response.json();
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
}
```
Jeg starter med at skrive "use server" for at funktionen kører på serveren fordi, det er mere sikkert end at gøre det i browseren.
Derefter importere jeg z fra zod, så jeg kan validere formularens input på serveren. 

Nu eksprtere jeg min asynkrone function så jeg kan bruge den i min opret bruger form component. functionen modtager nuværende form-state og formData som kommer direkte fra min form.

Nu henter jeg værdier af felterne (firstname, lastname, email, password) via .get() metode og ligger de i const variable.
Derefter opretter jeg et Zod‐schema, hvor jeg beskriver mine regler, det giver flejlbeskeder.

jeg validere værdierne mod schema. Der gør jeg ved at bruge metoden safeParse, den returnere et objekt, med props afhængigt af om min values passer, med min validation. Det objekt, har blandt andet en prop, som hedder success. 

Hvis validering fejler, returner fejlene i et format der er let at vise i via treeifyError.

Henter jeg API-base-URL fra miljøvariabler, så endpoint kan skifte mellem udvikling og produktion uden at ændre kode.

Derefter sender jeg en POST request til ${baseUrl}/users med fetch. Jeg sætter Content-Type: application/json, og jeg sender kun de validerede felter i body. Det minimerer risikoen for forkerte data.

Bagefter tjekker jeg, om svaret er ok. Hvis ikke, returene jeg et objekt, med 2 props. en er min error, og den anden min succes. 

Til sidst, når alt går godt, returnerer { success: true } til UI, så brugeren kan komme videre. Skulle der ske noget uventet i try‐blokken (netværksfejl, JSON‐fejl osv.), kaster jeg fejlen, så Next.js logger det korrekt det er bedre end at ignorere fejlene.

## Ændringer i design
Jeg har ændret designet på listingsiden i forbindelse med en valgfri opgave. Derudover har jeg tilføjet en kontaktsektion under listen. Det er et meningsfuldt sted at placere kontaktsektion. Knappernes og images baggrundsfarve er justeret, så den matcher ikoner og logo, det giver et mere sammenhængende og professionelt udtryk 

# Min Logbog

## Dag 1
starttidspunkt: 8:37
sluttidspunkt: 15:49

## Dag 2
starttidspunkt: 8:03
sluttidspunkt: 15:25

## Dag 3
starttidspunkt: 8:03
sluttidspunkt: 15:48

## Dag 4
starttidspunkt: 8:27
sluttidspunkt: 15:50

## Dag 5
starttidspunkt: 8:05
sluttidspunkt:  

