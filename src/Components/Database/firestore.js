import {db} from "../../firebase";

const createUserDocument = async (user)=>{
    if(!user) return;
    const userReference = db.doc(`users/${user.uid}`);
    const snapshot = await userReference.get();
    if(!snapshot.exists){
        const {email} = user;
        try{
            userReference.set({
                email,
                createdAt: Date.now()
            });
        }catch(error){
            console.log('Error in saving user', error);
        }
    }
}

const addRecipe = async (user, recipe)=>{
    if(!user) return;
    if(!recipe) return;
    console.log(user.uid);

    try{
        await db.collection('users').doc(user.uid).collection('recipes').add(recipe);
    }catch (e) {
        console.error("Error adding recipe", e);
    }
}


const deleteRecipe = async (user, id)=>{
    if(!user) return;
   const recipe= await db.collection('users').doc(user.uid).collection('recipes').where('id', '==', id).get();
   console.log(recipe);
    recipe.forEach((doc)=>{
        doc.ref.delete().then(()=>{
            console.log("Recipe deleted successfully!")
        }).catch((error)=>{
            console.log('Failed to delete recipe: ', error);
        });
    });
}

export{createUserDocument, addRecipe, deleteRecipe}