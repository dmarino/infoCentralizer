ServiceConfiguration.configurations.remove({
  service: 'instagram'
});
ServiceConfiguration.configurations.insert({
  service: 'instagram',
  scope: ['basic'],
  clientId: process.env.instagramID,
  secret: process.env.instagramSecret
});