import React from 'react';
import SimpleReactValidator from 'simple-react-validator';

 class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        name: '',
        error:{}
        }
        this.validator = new SimpleReactValidator();
    }

        
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
        
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    
  
    onSubmitSignIn = (event) => {
        fetch('http://localhost:3001/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            })
        })
        .then(response =>response.json())
        .then(user =>{
            if (user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        if (this.validator.allValid()) {
            // alert('You submitted the form and stuff!');
          } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
          }
       
    }
    
    render(){
        
        return (
            <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                    
                        <label className="db fw6 lh-copy f3" htmlFor="text">Name</label>
                        <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 shadow-5" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                                onBlur={() => this.validator.showMessageFor('name')}
                                />
                            {this.validator.message('name', this.state.email, 'required|name', { className: 'text-danger' })}
                    </div>
                    <div className="mt3">
                    
                        <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                        <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 shadow-5" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                                onBlur={() => this.validator.showMessageFor('email')}
                                />
                                {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                        
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
                        <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 shadow-5" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}  
                                onBlur={() => this.validator.showMessageFor('password')}
                                />
                                 {this.validator.message('password', this.state.password, 'required|password|min:8', { className: 'text-danger' })}
                        
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                            onClick = {this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib shadow-5" 
                            type="submit" 
                            value="Register" 

                    />
                    </div>
                    
                </div>
                </main>
                </article>
                
            </div>
        )
        }
}

export default Register
