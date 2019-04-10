import { Container } from 'unstated'

class RootContainer extends Container {

  state = {
    activePath: '/',
    isFull: false
  };

  activePath = (activePath) => {
    console.log("=== ACTIVE PATH ===")
<<<<<<< HEAD
     //console.log(props.match.path)
=======
    // console.log(props.match.path)
>>>>>>> dev
    if(activePath !== this.state.activePath){
      this.setState({
        activePath: activePath
      },
      () => {

        console.log(this.state.activePath)
      })
    }
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

}

export default RootContainer