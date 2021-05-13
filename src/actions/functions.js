import produce from "immer";
import { db } from "..";
import { SET_USER } from "../reducer/reducer";
import firebase from "firebase/app";
import "firebase/firestore";

export function handleAddToBagItem(item, user, alertDraft, dispatch, history) {
  const bagItem = {
    itemId: item.itemId,
    name: item.name,
    photo: item.photo,
    price: item.price,
    status: item.status ? item.status : ""
  };
  if (user.data) {
    db.collection("users")
      .doc(user.uid)
      .update({
        bag: firebase.firestore.FieldValue.arrayUnion(bagItem)
      })
      .then(() => {
        const hasItem = user.data.bag.find(
          (item) => item.itemId === bagItem.itemId
        );
        if (hasItem === undefined) {
          let payload = produce(user, (draftUser) => {
            draftUser.data.bag.push(bagItem);
          });
          dispatch({
            type: SET_USER,
            payload
          });
          alertDraft.show(
            <div style={{ color: "white", fontSize: "12px" }}>
              Successfully added to bag
            </div>
          );
        } else {
          alertDraft.show(
            <div style={{ color: "white", fontSize: "12px" }}>
              You have already had this product in your bag
            </div>
          );
        }
      });
  } else {
    history.push("/login");
  }
}
