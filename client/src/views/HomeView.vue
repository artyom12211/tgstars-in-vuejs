<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useWebAppNavigation } from 'vue-tg'

  const webAppNavigation = useWebAppNavigation()
 

  let getInvoiceLink = async () => {
    const response = await fetch('http://localhost:3000/tg/getInvoiceLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
    const invoiceLink = await response.json()
    return invoiceLink
  }

  let openInvoice = async () => {
    const getInvoiceLinkResult = await getInvoiceLink()
    if (getInvoiceLinkResult.success) {
      const invoiceLink = getInvoiceLinkResult.data
      webAppNavigation.openInvoice(invoiceLink, (url, status) => {
      })
    }
    
  }

</script>

<template>
  <main>
    Hello

    <button @click="openInvoice">Pay</button>
  </main>
</template>
