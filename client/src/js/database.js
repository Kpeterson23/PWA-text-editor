import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("putDb call");
  const connectiondb = await openDB("jate", 1);
  const objStore = connectiondb
    .transaction("jate", "readwrite")
    .objectStore("jate");
  const output = await objStore.put({ id: 1, value: content });
  console.log("Saved to the database", output);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("getDb call");
  const connectiondb = await openDB("jate", 1);
  const objStore = connectiondb
    .transaction("jate", "readonly")
    .objectStore("jate");
  const output = await objStore.getAll();
  console.log("get all result", output);
  if (!output) {
    return output.value;
  }
  return output;
};
initdb();
