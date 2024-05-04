import { useForm } from "react-hook-form"
import { useState } from "react"


export default function App() {
  const [count,setCount] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({defaultValues: {example: 'aaaaaa'}})


  const example = watch('example')
  const onSubmit = (data) => console.log(data)


  console.log(watch("example")) // watch input value by passing the name of it
  {errors && console.log(errors)}

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("example", { required:true })} />


      {/* include validation with required or other standard HTML validation rules */}
      <input defaultValue="test" {...register("exampleRequired", { minLength:{ value:4, message:'Min Length is 4'}  })} />
      {/* errors will return when field validation fails  */}
      {errors?.exampleRequired?.type === "minLength" && <p>{errors.exampleRequired.message}</p>}
      {example}

      <button onClick={()=>{setCount(c=>c+1)}}>test</button>
      <input type="submit" />
    </form>
  )
}
