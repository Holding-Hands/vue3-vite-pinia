import mitt from 'mitt'

const emitter = mitt()

export default emitter

// 发送事件
// import emitter from '@/mitt/eventBus';
// emitter.emit('my-event', { message: 'Hello from Component!' });

// 监听
// onMounted(() => {
//   // 注册事件监听器
//   emitter.on('my-event', handleMyEvent)
// })

// 卸载
// onUnmounted(() => {
//   // 清理事件监听器
//   emitter.off('my-event', handleMyEvent);
// });
