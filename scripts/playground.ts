import { realtimeDb } from "./firebase";
import { ServerValue } from "firebase-admin/database";

const ref = realtimeDb.ref("rooms");

(async () => {
  //  await ref.set({
  //   testId: {
  //     visitors: {
  //       visitor1: {
  //         name: "Visitor 1",
  //         updatedAt: Date.now(),
  //         createdAt: Date.now(),
  //       },
  //       visitor2: {
  //         name: "Visitor 2",
  //         updatedAt: Date.now(),
  //         createdAt: Date.now(),
  //       },
  //     },
  //     updatedAt: ServerValue.TIMESTAMP,
  //     createdAt: Date.now(),
  //   },
  // });
  // const visitorRef = ref.child("testId/visitors");
  // await visitorRef.push().set(
  //   {
  //     name: "Visitor Pushed",
  //     updatedAt: Date.now(),
  //     createdAt: Date.now(),
  //   },
  //   (error) => {
  //     if (error) {
  //       console.log("Data could not be saved." + error);
  //     } else {
  //       console.log("Data saved successfully.");
  //     }
  //   },
  // );
  // const roomRef = ref.child("testId");
  // await roomRef.update(
  //   {
  //     order: ["visitor1", "visitor2", "visitor3"],
  //   },
  //   () => {
  //     console.log("Data updated successfully.");
  //   },
  // );
  // roomRef.remove(() => {
  //   console.log("Data removed successfully.");
  // });
})();
