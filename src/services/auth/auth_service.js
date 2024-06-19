import API from "../api";


export default class AuthService{
    static login(payload){
        return API.ax.post('login',payload).catch(e=>console.log(e))
    }

    // static currentUserDetails(){
    //     return API.ax.get('current-user/').catch(e=>console.log(e))
    // }

    // static getCustomers(){
    //     return API.ax.get(`customers/`).catch(e=>console.log(e))
    // }

    // static getCustomersCount(){
    //     return API.ax.get(`customer/count/`).catch(e=>console.log(e))
    // }

    // static setCustomers(formData){
    //     return API.ax.post(`create/system-user`,formData).catch(e=>console.log(e))
    // }


    // static setApplication(formData){
    //     return API.ax.post(`application-create/`,formData).catch(e=>console.log(e))
    // }

    // static getApplication(){
    //     return API.ax.get(`application-list/`).catch(e=>console.log(e))
    // }
   
   
   
}