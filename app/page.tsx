14:18:22.191 
./app/page.tsx:21:7
14:18:22.191 
Type error: Variable 'tools' implicitly has type 'any[]' in some locations where its type cannot be determined.
14:18:22.191 
14:18:22.191 
  19 |
14:18:22.191 
  20 | export default async function Home() {
14:18:22.191 
> 21 |   let tools = [];
14:18:22.192 
     |       ^
14:18:22.192 
  22 |   
14:18:22.192 
  23 |   try {
14:18:22.192 
  24 |     await dbConnect(); 
14:18:22.221 
Next.js build worker exited with code: 1 and signal: null
14:18:22.257 
Error: Command "npm run build" exited with 1
