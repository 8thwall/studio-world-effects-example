import * as ecs from '@8thwall/ecs'

const OBJECT_PLACED_EVENT = 'object-placed'

ecs.registerComponent({
  name: 'tap-to-place',
  schema: {
    prefab: 'eid'
  },
  stateMachine: ({world, eid, schemaAttribute, defineState}) => {
    defineState('initial').initial().listen(eid,  ecs.input.SCREEN_TOUCH_START, (e) => {
      if (!e.data.worldPosition) {
        return
      }
      const newEid = world.createEntity(schemaAttribute.get(eid).prefab)
      const newEntity = world.getEntity(newEid)
      newEntity.setLocalPosition(e.data.worldPosition)
      newEntity.set(ecs.Quaternion, ecs.math.quat.yRadians(Math.random() * Math.PI))
      world.events.dispatch(eid, OBJECT_PLACED_EVENT)
    })
  }
})

export {
  OBJECT_PLACED_EVENT,
}
