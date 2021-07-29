import React from 'react';
import SimpleReactValidator from 'simple-react-validator';


class Signin extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
        signInEmail: '',
        signInPassword: ''
        }
        this.validator = new SimpleReactValidator();
    }
        
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
        
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response =>response.json())
        .then(user =>{
            if (user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
            else {
                alert('User not found!Please Register')
            }
        }).catch(error =>{alert('User not found!Please Register')})
        
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
        const {onRouteChange} = this.props;
        return (
            
            <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label  
                                className="db fw6 lh-copy f3" 
                                htmlFor="email-address">Email</label>
                        <input  
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 shadow-5" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                        />
                        {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                    </div>
                    <div className="mv3">
                        <label  className="db fw6 lh-copy f3" 
                                htmlFor="password">Password</label>
                        <input  
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 shadow-5" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                        />
                         {this.validator.message('password', this.state.password, 'required|password', { className: 'text-danger' })}
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                          onClick = {this.onSubmitSignIn}
                          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib shadow-5" 
                          type="submit" 
                          value="Sign in" />
                    </div>
                    <div className="lh-copy mt3 fw4 f4 b">
                    <p onClick={()=>{onRouteChange('register')}}  
                        className="f6 link dim black db pointer">Register</p>
                
                    </div>
                </div>
                </main>
                </article>
                
            </div>
        )

       }
        
    
}

export default Signin
