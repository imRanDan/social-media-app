import { Input } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
    const [inputs, setInputs] = useState ({
        email: '',
        password: '',
        confirmPassword: ''
    })


  return (
    <>
        <Input 
            placeholder='Email'
            fontSize={14}
            type='email'
            value={inputs.email}
            onChange={(e) => setInputs({...inputs,email:e.target.value})}
        />
        <Input 
            placeholder='Password'
            fontSize={14}
            type='password'
            value={inputs.password}
            onChange={(e) => setInputs({...inputs,password:e.target.value})}
        />
    </>
  )
}

export default Signup