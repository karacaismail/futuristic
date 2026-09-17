"""The curated catalogue is authoritative; validate it without overwriting editorial fields."""
from pathlib import Path
import json
items = json.loads((Path(__file__).resolve().parents[1] / 'src/data/tools.json').read_text())
assert len({item['id'] for item in items}) == len(items)
for item in items:
    for field in ('name', 'topic', 'pricing', 'license', 'limits', 'maturity', 'integration', 'workflow', 'decision', 'evidence'):
        assert item[field], (item['id'], field)
    for field in ('pricing', 'license', 'limits', 'maturity', 'integration'):
        assert isinstance(item['availability'][field], bool), (item['id'], field)
print(len(items), 'araç doğrulandı; düzenleme src/data/tools.json içinde yapılır.')
