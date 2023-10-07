import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) {}

  private readonly USER_ID_KEY = 'iduser';
  private readonly USER_ROLE_KEY = 'idrole';

  apiUrlRole = 'http://localhost:3000/role';
  apiUrlUser = 'http://localhost:3000/user';
  apiUrlFournisseur = 'http://localhost:3000/fournisseur';
  apiUrlProduit = 'http://localhost:3000/produit';
  apiUrlCommande = 'http://localhost:3000/commande';
  apiUrlCategorie = 'http://localhost:3000/categorie';
  apiUrlLivraison = 'http://localhost:3000/livraison';
  apiUrlLigneDeCommande = 'http://localhost:3000/lignedecommande';
  apiUrlCommandeEtat = 'http://localhost:3000/commandeetat';
  apiUrlLogin = 'http://localhost:3000/login';
  apiUrlRegister = 'http://localhost:3000/register';

  register(idRole: number = 2, nom: string, tele: string, email: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrlRegister}`, { idRole, nom, tele, email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // Save token to localStorage
          }
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  login(nom: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrlLogin}`, { nom, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // Save token to localStorage
          }
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage on logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists in localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Get token from localStorage
  }

  //-----------------ROLE---------------------------
  getAllDataRole():Observable<any> { return this._http.get(`${this.apiUrlRole}`); }
  createDataRole(data:any):Observable<any> { return this._http.post(`${this.apiUrlRole}`, data); }
  updateDataRole(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlRole}/${id}`;
    return this._http.put(url, data);
  }
  deleteDataRole(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlRole}/${ids}`);
  }
  getSingleDataRole(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlRole}/${ids}`);
  }

  //-----------------COMMANDE ETAT----------------------------
  getAllDataCommandeEtat():Observable<any> { return this._http.get(`${this.apiUrlCommandeEtat}`); }
  createDataCommandeEtat(data:any):Observable<any> { return this._http.post(`${this.apiUrlCommandeEtat}`, data); }
  updateDataCommandeEtat(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlCommandeEtat}/${id}`;
    return this._http.put(url, data);
  }
  deleteDataCommandeEtat(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlCommandeEtat}/${ids}`);
  }
  getSingleDataCommandeEtat(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlCommandeEtat}/${ids}`);
  }

  //-----------------CATEGORIES----------------------------
  getAllDataCategorie():Observable<any> { return this._http.get(`${this.apiUrlCategorie}`); }
  createDataCategorie(data:any):Observable<any> { return this._http.post(`${this.apiUrlCategorie}`, data); }
  updateDataCategorie(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlCategorie}/${id}`;
    return this._http.put(url, data);
  }
  deleteDataCategorie(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlCategorie}/${ids}`);
  }
  getSingleDataCategorie(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlCategorie}/${ids}`);
  }

  //-----------------USERS----------------------------
  getAllDataUser():Observable<any> { return this._http.get(`${this.apiUrlUser}`); }
  createDataUser(data:any):Observable<any> { return this._http.post(`${this.apiUrlUser}`, data); }
  updateDataUser(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlUser}/${id}`;
    return this._http.put(url, data);
  }
  deleteDataUser(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlUser}/${ids}`);
  }
  getSingleDataUser(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlUser}/${ids}`);
  }

  //-----------------FOURNISSEURS----------------------------
  getAllDataFournisseur():Observable<any> { return this._http.get(`${this.apiUrlFournisseur}`); } 
  createDataFournisseur(data:any):Observable<any> { return this._http.post(`${this.apiUrlFournisseur}`, data); }
  updateDataFournisseur(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlFournisseur}/${id}`;
    return this._http.put(url, data);
  }
  deleteDataFournisseur(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlFournisseur}/${ids}`);
  }
  getSingleDataFournisseur(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlFournisseur}/${ids}`);
  }

  //-----------------PRODUITS----------------------------
  getAllDataProduit():Observable<any> { return this._http.get(`${this.apiUrlProduit}`); }
  createDataProduit(data:any):Observable<any> { return this._http.post(`${this.apiUrlProduit}`, data); }
  updateDataProduit(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlProduit}/${id}`;
    return this._http.put(url, data);
  }
  deleteDataProduit(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlProduit}/${ids}`);
  }
  getSingleDataProduit(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlProduit}/${ids}`);
  }

  //-----------------COMMANDES----------------------------
  getAllDataCommande():Observable<any> { return this._http.get(`${this.apiUrlCommande}`); }
  createDataCommande(data:any):Observable<any> { return this._http.post(`${this.apiUrlCommande}`, data); }
  updateDataCommande(id: any, data: any): Observable<any> {
    let url = `${this.apiUrlCommande}/${id}`;
    return this._http.put(url, data);
  }
  changeEtatCommande(id: any, newEtat: any): Observable<any> {
    return this._http.patch(`${this.apiUrlCommande}/${id}`, { idEtat: newEtat });
  }
  deleteDataCommande(id:any):Observable<any> { 
    let ids = id;
    return this._http.delete(`${this.apiUrlCommande}/${ids}`);
  }
  getSingleDataCommande(id:any):Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrlCommande}/${ids}`);
  }
  getAllDataCommandeUser(idUser:any):Observable<any> {
    return this._http.get(`${this.apiUrlCommande}/0/${idUser}`);
  }

  //-----------------LIVRAISONS----------------------------
  getAllDataLivraison():Observable<any> { return this._http.get(`${this.apiUrlLivraison}`); }
  createDataLivraison(data:any):Observable<any> { return this._http.post(`${this.apiUrlLivraison}`, data); }
  updateDataLivraison(idFourniseur: any, idProduit: any, data: any): Observable<any> {
    return this._http.put(`${this.apiUrlLivraison}/${idFourniseur}/${idProduit}`, data);
  }
  deleteDataLivraison(idFourniseur: any, idProduit: any):Observable<any> {
    return this._http.delete(`${this.apiUrlLivraison}/${idFourniseur}/${idProduit}`);
  }
  getSingleDataLivraison(idFourniseur: any, idProduit: any):Observable<any> {
    return this._http.get(`${this.apiUrlLivraison}/${idFourniseur}/${idProduit}`);
  }

  //-----------------COMMANDE DETAILS----------------------------
  getAllDataLigneDeCommande():Observable<any> { return this._http.get(`${this.apiUrlLigneDeCommande}`); }
  createDataLigneDeCommande(data:any):Observable<any> { return this._http.post(`${this.apiUrlLigneDeCommande}`, data); }
  updateDataLigneDeCommande(idProduit: any, idCommande: any, data: any): Observable<any> {
    return this._http.put(`${this.apiUrlLigneDeCommande}/${idProduit}/${idCommande}`, data);
  }
  deleteDataLigneDeCommande(idProduit: any, idCommande: any):Observable<any> {
    return this._http.delete(`${this.apiUrlLigneDeCommande}/${idProduit}/${idCommande}`);
  }
  getSingleDataLigneDeCommande(idProduit: any, idCommande: any):Observable<any> {
    return this._http.get(`${this.apiUrlLigneDeCommande}/${idProduit}/${idCommande}`);
  }

  setIdUser(iduser: number) {
    localStorage.setItem(this.USER_ID_KEY, String(iduser));
  }

  getIdUser(): number | undefined {
    const iduser = localStorage.getItem(this.USER_ID_KEY);
    return iduser ? parseInt(iduser, 10) : undefined;
  }

  setIdRole(idrole: number) {
    localStorage.setItem(this.USER_ROLE_KEY, String(idrole));
  }

  getIdRole(): number | undefined {
    const idrole = localStorage.getItem(this.USER_ROLE_KEY);
    return idrole ? parseInt(idrole, 10) : undefined;
  }
  
  /*
  clearUserData() {
    this._iduser = undefined;
  }
  clearRoleData() {
    this._idrole = undefined;
  }*/
}
