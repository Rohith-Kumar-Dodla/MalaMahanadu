import sqlite3

conn = sqlite3.connect('mala_mahanadu.db')
cursor = conn.cursor()

cursor.execute('SELECT name FROM sqlite_master WHERE type="table";')
tables = cursor.fetchall()
print("Tables in database:")
for table in tables:
    print(f"  - {table[0]}")

# Check if gallery table exists
if any('gallery' in str(table) for table in tables):
    print("\nGallery table exists!")
    cursor.execute('PRAGMA table_info(gallery);')
    columns = cursor.fetchall()
    print("Gallery table columns:")
    for col in columns:
        print(f"  - {col[1]} ({col[2]})")
else:
    print("\nGallery table does NOT exist!")

conn.close()
