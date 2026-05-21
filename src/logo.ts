import * as ecs from '@8thwall/ecs'

// This component is attached to the logo, which allows instances to be queried for by the reset 
// button
const Logo = ecs.registerComponent({name: 'logo'})

export {
  Logo, 
}
