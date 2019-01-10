# TWEB TE2

author: Mathieu Jee

date: January 2019



## Choix d'implémentation

J'ai choisi d'implémenter la partie `backend`.



**Serveur**: https://tweb-te2-server.herokuapp.com/graphql

**Client** (uniqument login): https://tweb-te2-client.herokuapp.com/

## Serveur (Backend)

database importée: 

![](img/mongodbimport.PNG)



Créer un utilisateur: 

http://localhost:5000/graphql(Si serveur démarré en local), ou sinon https://tweb-te2-server.herokuapp.com/graphql	

query: 

```
query {
	createUser(username: "toto", password: "toto") {
    username
  }
}
```



Tests unitaires (bidons) implémentés dans la partie client.



## Client

J'ai un mini client avec uniquement un processus d'authentification et des tests unitaires sur un *component* bidon.

Repo client: https://github.com/mathieujee/TWEB_TE2_Client

**Heroku**: https://tweb-te2-client.herokuapp.com/

