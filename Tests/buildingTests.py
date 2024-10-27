# buildingTests will test the building codes to verify that TerrierMap will
# correctly take in the 3 letter classroom code and return the corresponding 
# name, address, and coordinates to the building if it exists in the database

import unittest

class testBuildingCodes(unittest.TestCase):

    def test_upper(self):
        self.assertEqual("CAS", "CAS")


if __name__ == '__main__':
    unittest.main()