import _ from 'lodash'

export const getCurrentLanguage = () => {
    const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

    // Split locales with a region code
    return language.toLowerCase().split(/[_-]+/)[0];
}

export const authenticate = () => {
    if(!_.isEmpty(localStorage.getItem('token'))){
        let localUser = JSON.parse(localStorage.getItem('user'));
        if(!_.isEmpty(localUser) && localUser.id){
            localUser = {...localUser}
            return localUser;
        }
    }
    return false
}