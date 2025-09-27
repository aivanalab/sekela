import sys
import os

# Add the functions directory to the Python path to allow for relative imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app
from mangum import Mangum

handler = Mangum(app)