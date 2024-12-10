# TerrierMap

CS673 - Group 6
Team Members: Ryan Christopher, Misael Gared, Jasmine Hughes, Siddhraj Parmar

## What is TerrierMap?

TerrierMap is a web application that allows students, faculty, and staff at Boston University to quickly and easily navigate their unique campus. Classes and events are always taking place on campus, and often the location is shared as a three-letter building code followed by the room number. 

For example, a student may have a class located at CAS. With this information, they would need to search for the name of the building with the code CAS to learn that it is the College of Arts and Sciences. Then they search for the building's name on a map and determine its location on the map. 


| Code |   | Building Name |   | Address |
| ---- | - | ------------- | - | ------- |
| CAS  | :arrow_right: | College of Arts and Sciences | :arrow_right: | 725 Commonwealth Avenue |  


TerrierMap serves as a useful tool that will allow someone to enter the building code and room number and navigate there with step-by-step instructions. 

## What we are using:

TerrierMap is built with Next.js and is currently deployed through Vercel. The application uses a Firestore database that stores the building code to street address conversions and uses React Leaflet to display the map. Leaflet Routing Machine is being used to provide step-by-step instructions on how to get from the current location to the destination.


#### Useful Links
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Firebase](https://firebase.google.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/)
