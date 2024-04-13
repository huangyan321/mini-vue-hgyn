/** @format */

const taskQueue: any[] = [];
let isFlushPending = false;
export function nextTick(fn: any) {
  return fn ? Promise.resolve().then(fn) : Promise.resolve();
}
export function queueJobs(job: any) {
  if (taskQueue.includes(job)) return;
  queueFlush(job);
}
function queueFlush(job: any) {
  if (isFlushPending) return;
  isFlushPending = true;
  taskQueue.push(job);
  nextTick(flushJobs);
}
function flushJobs() {
  let job;
  while ((job = taskQueue.shift())) {
    job && job();
  }
  isFlushPending = false;
}
