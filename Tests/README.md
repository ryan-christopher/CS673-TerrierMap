# Tests
This folder contains the tests for TerrierMap.

To be able to run the tests properly, a private key in the form of a .json file will need to be generated and added to the testing folder on your loval machine.

To get this file, go to the TerrierMap project on Firebase. Click the cog wheel (next to "Project Overview" at the top of the left side panel) and select "Project settings". From here select "Service accounts", double check you are on "Firebase Admin SDK" and then select the "Generate new private key" button.

Rename the file to "Terriermap-firebase-adminsdk.json" (aka delete everything after "adminsdk" and make the first "t" in terrerimap captial (T)).

Move this file from wherever it was downloaded into the Tests folder of the project (CS673-TerrierMap\Tests).