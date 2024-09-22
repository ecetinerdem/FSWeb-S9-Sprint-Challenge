import axios from 'axios'
import e from 'cors'
import React, { useState } from 'react'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.


 
  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const coordinates =[
      "(1, 1)",
      "(2, 1)",
      "(3, 1)",
      "(1, 2)",
      "(2, 2)",
      "(3, 2)",
      "(1, 3)",
      "(2, 3)",
      "(3, 3)",
    ]
    return coordinates[selectedIndex]
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setSelectedIndex(initialIndex)
    setSteps(initialSteps)
    setMessage(initialMessage)
    setEmail(initialEmail)
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (yon === 'left') {
      // Move left if not at the first column
      if (selectedIndex % 3 !== 0) {
        setSelectedIndex(selectedIndex - 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sola gidemezsiniz")
        
      }
    }
    
    if (yon === 'right') {
      // Move right if not at the last column
      if (selectedIndex % 3 !== 2) {
        setSelectedIndex(selectedIndex + 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sağa gidemezsiniz")
        
      }
    }
    
    if (yon === 'up') {
      // Move up if not in the top row
      if (selectedIndex > 2) {
        setSelectedIndex(selectedIndex - 3);
        setSteps(steps + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz")
        
      }
    }
    
    if (yon === 'down') {
      // Move down if not in the bottom row
      if (selectedIndex < 6) {
        setSelectedIndex(selectedIndex + 3);
        setSteps(steps + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz")
        
      }
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function onChangeHandler(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value)
  }

  function onSubmitHandler(evt) {
    evt.preventDefault()
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    const payload = {
      "x": getXY().slice(1, 2), "y": getXY().slice(4, 5), steps: steps, email: email
    };
    setEmail(initialEmail)

    axios.post('http://localhost:9000/api/result', payload)
    .then(function (response) {
      console.log(response);
      setMessage(response.data.message)
    })
    .catch(function (error) {
      console.log(error);
      setMessage(error.response.data.message)
    });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === selectedIndex ? ' active' : ''}`}>
              {idx === selectedIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(e) => sonrakiIndex(e.target.id)}>SOL</button>
        <button id="up" onClick={(e) => sonrakiIndex(e.target.id)}>YUKARI</button>
        <button id="right" onClick={(e) => sonrakiIndex(e.target.id)}>SAĞ</button>
        <button id="down" onClick={(e) => sonrakiIndex(e.target.id)}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input value={email} id="email" type="email" placeholder="email girin" onChange={(e) => onChangeHandler(e)}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
