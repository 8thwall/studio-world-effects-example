import * as ecs from '@8thwall/ecs'
import { Logo } from './logo'
import { OBJECT_PLACED_EVENT } from './tap-to-place'

const logoQuery = ecs.defineQuery([Logo])

ecs.registerComponent({
  name: 'reset-button',
  stateMachine: ({world, entity, defineState}) => {
    defineState('nothing-placed')
      .initial()
      .onEvent(OBJECT_PLACED_EVENT, 'placed', {target: world.events.globalId})
      .onEnter(() => entity.hide())
      .onExit(() => entity.show())

    defineState('placed')
      .onEvent(ecs.input.UI_CLICK, 'resetting')
      
    defineState('resetting')
      .wait(1000, 'nothing-placed')
      .onEnter(() => {
      const tempVector = ecs.math.vec3.zero();
        logoQuery(world).forEach(e => {
          world.transform.getLocalPosition(e, tempVector)
          ecs.PositionAnimation.set(world, e, {
            duration: 1000,
            loop: false,
            fromX: tempVector.x,
            fromY: tempVector.y,
            fromZ: tempVector.z,
            toX: tempVector.x,
            toY: -4,
            toZ: tempVector.z,
            easeIn: true,
            easingFunction: 'Quadratic'
          })
        })
      })
      .onExit(() => {
        logoQuery(world).forEach(e => {
          world.deleteEntity(e)
        })
      })
  }
})
