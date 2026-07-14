import { Form, useActionData} from "react-router"
import { Input } from "../../components/BaseComponents/Input"
import { Button } from "../../components/BaseComponents/Button"
import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react"


const nonSpaceformat = /^\S+$/

type Errors = {
    errors: [
        {
            message: string,
            rule: string,
            field: string
        }
    ]
}


export function UserForm(){
    const [username, setUsername] = useState("")
    const [usernameErr, setUsernameErr ]= useState<string|undefined>(undefined)
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr ]= useState<string|undefined>(undefined)
    const confirmPassRef= useRef<HTMLInputElement>(null)
    const [confirmPassErr, setConfirmPassErr ]= useState<string|undefined>(undefined)
    const error = useActionData() as Errors

    function userOnChange(e: ChangeEvent<HTMLInputElement>){
        const userInput = e.target.value
        const validUsername = nonSpaceformat.test(userInput) || userInput === ""
        validUsername 
            ? setUsernameErr(undefined) 
            : setUsernameErr("username must contain at least 1-50 charactors and not contain space")
        setUsername(userInput)
    }
    function passOnChange(e: ChangeEvent<HTMLInputElement>){
        const passInput = e.target.value
        const validPass = nonSpaceformat.test(passInput) || passInput === ""
        validPass 
            ? setPasswordErr(undefined) 
            : setPasswordErr("password must contain at least one charactor and not contain space")
        setPassword(passInput)
    }

    function onSubmit(e: SyntheticEvent){
        const confirmPassEle = confirmPassRef.current
        const confirmPass = confirmPassEle?.value
        const notvalidConfirmPass = password !== confirmPass
        
        const isUsernameEmpty = username === ""
        
        const isPasswordEmpty = password === ""

        if(notvalidConfirmPass || isUsernameEmpty || isPasswordEmpty){
            e.preventDefault()
            if(notvalidConfirmPass && confirmPassEle){
                confirmPassEle.value = ""
                setConfirmPassErr("password doesn't match")
            }
            if(isUsernameEmpty){
                setUsernameErr("username must contain at least one charactor and not contain space")
            }
            if(isPasswordEmpty){
                setPasswordErr("password must contain at least one charactor and not contain space")
            }
        }
       
    }

    return (
    <>
    <div className="m-6 pb-50 flex justify-center">
        <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-3">Create User</h2>
            
            <Form className="flex flex-col gap-1.5" method="POST" onSubmit={onSubmit}>
                <label className="font-semibold">Username</label>
                <Input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={userOnChange}
                />
                {usernameErr && <span className="text-red-500">{usernameErr}</span>}
                {error && error.errors.map( (e, index) => <span key={index} className="text-red-500">{e.message}</span>)}
                <label className="font-semibold">Email</label>
                <Input 
                    type="text" 
                    name="email" 
                />
                <label className="font-semibold">Firstname</label>
                <Input 
                    type="text" 
                    name="firstname"
                />
                <label className="font-semibold">Lastname</label>
                <Input 
                    type="text" 
                    name="lastname" 
                />

                <label className="font-semibold">Role</label>
                    <div className="flex gap-1">
                        <input 
                            type="radio" 
                            name="role" 
                            value="user"
                            defaultChecked
                            className="cursor-pointer"
                        /> 
                        <label>User</label>
                    </div>
                    <div className="flex gap-1">
                        <input 
                            type="radio" 
                            name="role" 
                            value="admin"
                            className="cursor-pointer"
                        /> 
                        <label>Admin</label>
                    </div>
                
                <label className="font-semibold">Password</label>
                <Input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={passOnChange}
                />
                {passwordErr && <span className="text-red-500">{passwordErr}</span>}
                <label className="font-semibold">Confirm Password</label>
                <Input 
                    type="password" 
                    name="confirm_password"
                    ref={confirmPassRef}
                />
                {confirmPassErr && <span className="text-red-500">{confirmPassErr}</span>}
                <div className="mt-4 flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto px-8">
                        Create
                    </Button>      
                </div>
            </Form>
        </div>
    </div>
    </>)
}