import os
import sys
import tempfile
import unittest

sys.path.append(os.path.dirname(__file__))
from update_env import update_env_file_with_local_env

class UpdateEnvTestCase(unittest.TestCase):
    def test_digits_in_variable_name(self):
        """Variables containing digits should be processed correctly."""
        input_content = "VAR1=GET_FROM_LOCAL_ENV\nFOO=bar\n"
        with tempfile.NamedTemporaryFile('w', delete=False) as infile:
            infile.write(input_content)
            input_path = infile.name
        with tempfile.NamedTemporaryFile('w', delete=False) as outfile:
            output_path = outfile.name
        try:
            os.environ['VAR1'] = 'value1'
            update_env_file_with_local_env(input_path, output_path)
            with open(output_path) as f:
                lines = f.readlines()
            self.assertIn('VAR1=value1\n', lines)
            self.assertIn('FOO=bar\n', lines)
        finally:
            os.unlink(input_path)
            os.unlink(output_path)

if __name__ == '__main__':
    unittest.main()
