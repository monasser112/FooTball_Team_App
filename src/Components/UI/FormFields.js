import React from 'react'

const FormFields = ({formdata,id,change}) => {


    const showError=()=>{
        
        let errorMessage=(
        <div className="error_label">
        {formdata.validation &&!formdata.valid? formdata.validationMessage:null}
           
        </div>
        )
        return errorMessage
    }

    const renderTemplate=()=>{
        let formtemplate=null;
        switch(formdata.element){
            case('input'):
            formtemplate=(
        <div>
              {
                  formdata.showLabel?
                  <div className="label_inputs">{formdata.config.label}</div>
                  :null}
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={(event)=>change({event,id})}

               />
        </div>
            );
            break;
            case('select'):
            formtemplate=(
                <div>
                      {
                          formdata.showLabel?
                          <div className="label_inputs">{formdata.config.label}</div>
                          :null}
                    <select
                      value={formdata.value}
                      onChange={(event)=>change({event,id})}
                     >
                      <option value="">{formdata.value}</option>
                      {
                            formdata.config.options.map(item=>(
                                <option key={item.key} value={item.value}>
                                    {item.value}
                                </option>
                            ))
                      }


                       </select>
                </div>
                    );

            break;
            default:formtemplate=null;
        }
        return formtemplate;
    }
    return (
        <div>
            {
                renderTemplate()}
                {showError()}
                

        </div>
    )
}

export default FormFields
