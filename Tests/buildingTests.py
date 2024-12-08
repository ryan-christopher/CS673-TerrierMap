# buildingTests will test the building codes to verify that TerrierMap will
# correctly take in the 3 letter classroom code and return the corresponding 
# name, address, and coordinates to the building if it exists in the database

import unittest
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter

#setting up the connection to the database
cred = credentials.Certificate("CS673-TerrierMap\Tests\Terriermap-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

class TestBuildingCodes(unittest.TestCase):
    
    #Testing 3-letter classroom codes
    def test_codes(self):
        #Normal Case
        cas_ref = db.collection("classrooms").document("CAS")
        cas = cas_ref.get()
        cas_building_query = cas.get("building_name")

        self.assertEqual(cas_building_query, "College of Arts & Sciences")

        #Edge Case
        on_ref = db.collection("classrooms").document("ON")
        on = on_ref.get()
        on_building_query = on.get("building_name")

        self.assertEqual(on_building_query, "Online")

        #Input Validation/Error Handling
        error_ref = db.collection("classrooms").document("Error")
        error = error_ref.get()
        error_building_query = error.get("building_name")

        self.assertEqual(error_building_query, None)

    #testing addresses
    def test_address(self):
        #Normal Case
        met_ref = db.collection("classrooms").document("MET")
        met = met_ref.get()
        met_address_query = met.get("address")

        self.assertEqual(met_address_query, "1010 Commonwealth Ave. Boston, MA")

        #Edge Case
        blnd_ref = db.collection("classrooms").document("BLND")
        blnd = blnd_ref.get()
        blnd_address_query = blnd.get("address")

        self.assertEqual(blnd_address_query, None)

        #Input Validation/Error Handling
        error_ref = db.collection("classrooms").document("Error")
        error = error_ref.get()
        error_address_query = error.get("address")

        self.assertEqual(error_address_query, None)

    #testing latitudes and longtitudes  
    def test_geopoint(self):
        #Normal Case
        kcb_ref = db.collection("classrooms").document("KCB")
        kcb = kcb_ref.get()
        kcb_geopoint_query = kcb.get("lat_long")
        kcb_lat = kcb_geopoint_query.latitude
        kcb_long = kcb_geopoint_query.longitude

        self.assertEqual(kcb_lat, 42.34943)
        self.assertEqual(kcb_long, -71.09826)

        #Edge Case
        on_ref = db.collection("classrooms").document("ON")
        on = on_ref.get()
        on_geopoint_query = on.get("lat_long")

        self.assertEqual(on_geopoint_query, None)

        #Input Validation/Error Handling
        error_ref = db.collection("classrooms").document(" ")
        error = error_ref.get()
        error_geopoint_query = error.get("lat_long")

        self.assertEqual(error_geopoint_query, None)



if __name__ == '__main__':
    unittest.main()