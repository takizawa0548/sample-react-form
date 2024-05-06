import { useForm } from "react-hook-form"
import { useState } from "react"
import { useEffect } from "react";


export default function App() {
  const [count,setCount] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({defaultValues: {example: 'aaaaaa'}})

  useEffect(() => {
    const handleBeforeUnload = event => {
        // メッセージはほとんどのブラウザでは無視されますが、設定する必要があります
        event.preventDefault() // (1)
        event.returnValue = '' // (2)
    }

    // イベントリスナーを登録
    window.addEventListener('beforeunload', handleBeforeUnload);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }) 
  const example = watch('example')
  const onSubmit = (data) => console.log(data)


  console.log(watch("example")) // watch input value by passing the name of it
  {errors && console.log(errors)}

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("example", { disabled: count===0?true:false })} />

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
