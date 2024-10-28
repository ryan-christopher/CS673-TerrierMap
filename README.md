# TerrierMap

CS673 - Group 6
Team Members: Ryan Christopher, Misael Gared, Jasmine Hughes, Siddhraj Parmar

## What is TerrierMap?

TerrierMap is a web application that allows students, faculty, and staff at Boston University to quickly and easily navigate their unique campus. Classes and events are always taking place on campus, where most of the time the location is shared in a three letter building code followed by the room number. 

For example, a student may have a class located at CAS. With that information, they would need to search for the name of the building with the code CAS and would learn that it is the College of Arts and Sciences. With that information, they could then search the buildings name on a map and determine it's location on the map. 


| Code |   | Building Name |   | Address |
| ---- | - | ------------- | - | ------- |
| CAS  | :arrow_right: | College of Arts and Sciences | :arrow_right: | 725 Commonwealth Avenue |  


TerrierMap serves as a useful tool that will allow someone to enter the building code and room number that they would like to go to, and receive step by step instructions on how to get there. 

## What we are using:

TerrierMap is built with Next.js and is currently deployed through Vercel. The application uses a firestore database that has the building code to street address conversions, and uses React Leaflet for displaying the map. Leaflet Routing Machine is being used to provide step by step instructions on how to get from the current location to the destination.


#### Useful Links
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Firebase](https://firebase.google.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/)
