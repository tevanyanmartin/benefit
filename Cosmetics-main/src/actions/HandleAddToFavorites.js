import produce from "immer";
import { db } from "..";
import { SET_USER } from "../reducer/reducer";
import firebase from "firebase/app";
import "firebase/firestore";

export function handleAddToFavorites(
  item,
  user,
  alertDraft,
  dispatch,
  history
) {
  const handleDeleteFromFavorites = (itemId, user) => {
    db.collection("users")
      .doc(user.uid)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(
          user.data.favorites.find((item) => item.itemId === itemId)
        )
      })
      .then(() => {
        let payload = produce(user, (draftUser) => {
          let result = draftUser.data.favorites.findIndex(function (favItem) {
            return favItem.itemId === itemId;
          });
          draftUser.data.favorites.splice(result, 1);
        });
        dispatch({
          type: SET_USER,
          payload
        });
      });
  };

  const favItem = {
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
        favorites: firebase.firestore.FieldValue.arrayUnion(favItem)
      })
      .then(() => {
        const hasItem = user.data.favorites.find(
          (item) => item.itemId === favItem.itemId
        );
        if (hasItem === undefined) {
          let payload = produce(user, (draftUser) => {
            draftUser.data.favorites.push(favItem);
          });
          dispatch({
            type: SET_USER,
            payload
          });

          alertDraft.show(
            <div style={{ color: "white", fontSize: "12px" }}>
              Successfully added to favorites
            </div>
          );
        } else {
          handleDeleteFromFavorites(item.itemId, user);
          alertDraft.show(
            <div style={{ color: "white", fontSize: "12px" }}>
              'Successfully deleted!'
            </div>
          );
        }
      });
  } else {
    history.push("/login");
  }
}
