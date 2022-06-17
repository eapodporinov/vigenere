/*
*
* vizhener.encryption (язык шифра - ru | en , шифруемый текст , текст ключ)
*
* vizhener.decryption (язык шифра - ru | en , ключ , текст шифра)
*
*/

var vizhener = {
  ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(''),
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
  square: [],
  genSqViz: function (lang) {
    let l = this[lang], square = [];
    for (let i = 0; i < l.length; i++)
      this.square[i] = l.slice(i).concat(l.slice(0, i));
  },
  encryption: function (lang, text, key) {
    text = text.toUpperCase();
    key = key.toUpperCase();
    key = key.padEnd(text.length, key);
            
    this.genSqViz(lang);
    let s = "";
    let tmp;
    
    for (let i = 0; i < text.length; i++) {
      tmp = this.square[this[lang]
        .indexOf(text[i])][this[lang]
        .indexOf(key[i])];
        
      if (tmp == undefined)  
       return 'Text and key must contain only characters of the corresponding alphabet!';
       
      s += tmp;
    }
    
    return s;
  },
  decryption: function (lang, key, cipher) {
    cipher = cipher.toUpperCase();
    key = key.toUpperCase();
    key = key.padEnd(cipher.length, key);
        
    this.genSqViz(lang);
    let s = "";
    let row;
    let coll;
    
    for (var i = 0; i < cipher.length; i++) {
      row = this[lang].indexOf(key[i]);
      coll = this.square[row].indexOf(cipher[i]);
      
      if (this[lang][coll] == undefined)
       return 'Text and key must contain only characters of the corresponding alphabet!';
      
      s += this[lang][coll];
    }
    
    return s;
  }
};

// doc navigation
document.getElementById('btn_encrypt')
  .addEventListener('click', () => {
    let input_key = document.getElementById('input_key');
    let input_text = document.getElementById('input_text');
    let input_encrypted_text = document.getElementById('input_encrypted_text');
      
    if (input_key.value && input_text.value)
      try {
      input_encrypted_text.value = 
        vizhener.encryption(getCheckedRadioValue('radio_lang'), input_text.value, input_key.value);
      } catch(e) {
      	input_encrypted_text
          .value = 'Text and key must contain only characters of the corresponding alphabet!';
      }
  });
   
document.getElementById('btn_decrypt')
  .addEventListener('click', () => {
    let input_key = document.getElementById('input_key');
    let input_text = document.getElementById('input_text');
    let input_encrypted_text = document.getElementById('input_encrypted_text');
      
    if (input_key.value && input_encrypted_text.value)
      try {
      input_text.value = 
        vizhener.decryption(getCheckedRadioValue('radio_lang'), input_key.value, input_encrypted_text.value);
      } catch(e) {
      	input_text.value = 'Text and key must contain only characters of the corresponding alphabet!';
      }
  });

function getCheckedRadioValue(group) {
  let allInputs = document.querySelectorAll('input');
  
  for (let i = 0; i < allInputs.length; i++)
    if (allInputs[i].name == group && allInputs[i].checked == true)
      return allInputs[i].value;
}