export default {
    /**
     * @param {String} id 
     * @returns LEN_MIN | NON_SPACE | ERROR | OK
     * @description length over 5, nonSpace, RegexMatch
     */
    IdValidation : function (id){
        if (id.length < 5)
            return this.StatusCode.LEN_MIN

        if (id.indexOf(' ') >= 0)
            return this.StatusCode.NON_SPACE

        const idReg = /[^a-z0-9\-_]/g

        return id.match(idReg) ? this.StatusCode.ERROR : this.StatusCode.OK;
    },
    /**
     * @param {String} id 
     * @returns {Validator.StatusCode} LEN_MIN | NON_SPACE | NEED_ALPHA | NEED_NUMBER | NEED_SPECIAL | OK
     * @description length over 8, nonSpace, alpha, number, speical
     */
    PwdValidation : function (pwd) {
        if (pwd.length < 8)
            return this.StatusCode.LEN_MIN

        if(pwd.indexOf(' ') >= 0)
            return this.StatusCode.NON_SPACE;

        const engReg = /[A-Za-z]/gi;
        const numberReg = /[0-9]/gi;
        const specialReg = /[\!\@\#\$\%\^\&\*\~]/gi;
        
        const regexs = [engReg, numberReg, specialReg];
        const result = [this.StatusCode.NEED_ALPHA, this.StatusCode.NEED_NUMBER, this.StatusCode.NEED_SPECIAL]
    
        for (let pos = 0; pos < regexs.length; pos++)
            if (!pwd.match(regexs[pos]))
                return result[pos];

        return this.StatusCode.OK;
    },
    /**
     * @param {string} pwd
     * @param {string} pwdCheck
     * @returns {Boolean}
     * @description is diff pwd, pwdCheck
     */
    PwdCmpCheck : (pwd, pwdCheck) => {
        return pwd === pwdCheck
    },
    /**
     * @param {String} email
     * @returns {Boolean}
     * @description is match E-mail regexs
     */
    EmailValidation : email => {
        const regexs = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return email.match(regexs);
    },
    /**
     * @param {string} phone
     * @returns {Boolean}
     * @description start 010, not 0,1 at 4th number
     */
    PhoneValidation : phone => {
        const regexs = /010[2-9][0-9]{5,7}/g;
        return phone.match(regexs) && phone.length < 12;
    },
    /**
     * 
     * @param {Element} year 
     * @param {Element} month 
     * @param {Element} day
     * @returns NEED_NUMBER | AGE_OUT | AGE_DAY | AGE_MONTH | OK
     * @description age is 15 ~ 99, not illigal date
     */
    BirthdayValidation : function (_year, _month, _day) {
        const year = parseInt(_year.value);
        const month = parseInt(_month.value);
        const day = parseInt(_day.value);

        if (isNaN(year) || isNaN(month) || isNaN(day)) 
            return this.StatusCode.NEED_NUMBER

        const today = new Date();
        const age = today.getFullYear() - year
    
        if (!(14 <= age && age <= 100))
            return this.StatusCode.AGE_YEAR;
        else if (day < 1)
            return this.StatusCode.AGE_DAY;
        else {
            let isEven = year % 4 === 0 ? (year % 100 === 0 ? year % 400 === 0 : true) : false;
    
            if (!(0 <= month && month <= 12))
                return this.StatusCode.AGE_MONTH;
            else if ([2, 4, 6, 9, 11].some((value) => month == value)) {
                if (month != 2) {
                    if (day > 30) return this.StatusCode.AGE_DAY;
                }
                else {
                    if (day > (28 + (isEven ? 1 : 0)))
                        return this.StatusCode.AGE_DAY;
                }
            } else {
                if (day > 31) return this.StatusCode.AGE_DAY;
            }
    
        }
    
        return this.StatusCode.OK;
    },
    StringIsEmpty(str){
        return str.replace(/\s/g,'') === ''
    },
    StatusCode:{
        OK: 0,
        ERROR:100,
        NEED_ALPHA:110,
        NEED_LOWER:111,
        NEED_UPPER:112,
        NEED_NUMBER:120,
        NEED_SPECIAL:130,
        NON_SPACE:200,
        LEN_MIN:300,
        LEN_MAX:301,
        AGE_ERROR:400,
        AGE_OUT:401,
        AGE_ILLIGAL:410,
        AGE_YEAR:411,
        AGE_MONTH:412,
        AGE_DAY:413
    }
}