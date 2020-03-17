# Scene Control Adapter

This add-on allows you to create a list of virtual "scenes", which can in turn
be used as rule inputs and outputs.

For each scene defined by the user on the configuration page, both an action
and an event will be created with that name. The action can be used as a rule
output, while the event can be used as a rule input. These will all be added
to the "Scene Controller" device, which you'll need to add to your gateway
before using.

When the action is triggered, the event will immediately be fired off.
