import Head from 'next/head'
import { useEffect, useRef } from "react"
import { convert } from "any-to-any"
import RegexParser from 'regex-parser'

export default function Index() {

  let number = useRef("") // Número presente no input
  let result = useRef("") // Resultado binário do valor no input

  useEffect(() => {

    document.querySelector('#valueInput').addEventListener('input', (e) => {

      number = e.target.value
      result = ""
      
      if(RegexParser('^[0-1]+$').test(number) === true){ // Verifica se o input está somente com 0 e 1

        document.getElementById("errorValue").classList.add("d-none")

        const inputNumber = number
        const inputBase = 2
        const outputBase = 10
        result = convert(inputNumber, inputBase, outputBase)

      }else if(e.target.value == 0){ // Caso o input esteja vazio

        document.getElementById("errorValue").classList.add("d-none")

      }else{ // Input não está somente com 0 e 1

        document.getElementById("errorValue").classList.remove("d-none")

      }

      document.getElementById("convertValue").textContent = result // Mostra o resultado para o usuário
    
    })

  }, [number]) // Ativa cada vez que o valor number é atualizado

  return (

    <>

      <Head>

        <title>Bin2Dec</title>

      </Head>
    
      <section className="box position-absolute top-50 start-50 translate-middle d-flex flex-column gap-2 p-5">

        <h1 className="text-center fw-bold">Bin2Dec</h1>
        <p className="text-center">Enter a binary number, get a decimal conversion.</p>
        <p id="errorValue" className="d-none text-center text-danger">You entered a non-binary digit (please enter only 0 or 1).</p>
        <input id="valueInput" type="text" maxLength="8" />
        <p id="convertValue"></p>

      </section>
    
    </>

  )

}
