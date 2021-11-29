<script>
	import { _resizeImage, _checkNumber } from '@/common/common.svelte';
	import "./Cards.less";
	export let index;
	export let item={};
	function gotoMain(id){
		window.location.href = "/main.html?id="+id;
	}
</script>

<div class="cards" key={index}>
	<div class="cardTitle">
		<div class="cardColor" style="background:linear-gradient(0deg,  {item.leftBackgroundColor} 0%, {item.leftGradualColor} 100%)"></div>
		<div class="card_title">
			<span>{item.catalogName}</span>
			{#if item?.tagList?.length > 0}
			{#each item.tagList as v,i}
				{#if v.tagType == 1}
					<img class="hot" alt="hot" src="static/index/hot@3x.png"/>
				{:else if v.tagType == 2}
					<img class="new" alt="new" src="static/index/new@3x.png"/>
				{/if}
			{/each}
			{/if}
		</div>
	</div>
	<div class="content">
		{#if item?.tripPhotoCatalogList?.length>0}
		{#each item.tripPhotoCatalogList as tripItem,i}
			<div class="ugcContent" data-catalogid={tripItem.catalogId} on:click={()=>gotoMain(tripItem.catalogId)}>
				<div class="left">
					<div class="title">{tripItem.catalogName}</div>
					{#if !!tripItem.tripPhotoContent}
						<div class="subTitle {!!tripItem.coverImage ? 'subTitle-withImg' : 'subTitle-noImg'}">
							<div class="list">
								<img class="authorlogo" alt="authorlogo" src={_resizeImage(tripItem?.tripPhotoContent?.authorCoverImage,'_D_50_50')}/>
								<span>{@html tripItem?.tripPhotoContent?.content}</span>
							</div>
							<div class="readCount">
								<span class="count">{_checkNumber(tripItem.readCount)}阅读</span>
								{#if tripItem?.tagList?.length> 0}
								{#each tripItem.tagList as vtag,t}
									{#if vtag?.tagType == 3}
										<div class="updateIos"><span>{vtag.tagName}</span></div>
									{/if}
								{/each}
								{/if}
							</div>
						</div>
					{/if}
				</div>
				{#if !!tripItem.coverImage}
					<div class="right">
						<img class="sceneImg" alt="sceneImg" src="{_resizeImage(tripItem?.coverImage,'_D_150_150')}"/>
					</div>
				{/if}

				{#if tripItem?.tagList?.length> 0}
				{#each tripItem.tagList as vtag,t}
					{#if vtag.tagType == 1}
						<img class="hot" alt="hot" src="static/index/hot@3x.png"/>
					{:else if vtag.tagType == 2}
						<img class="new" alt="new" src="static/index/new@3x.png"/>
					{/if}
				{/each}
				{/if}
			</div>
		{/each}
		{/if}
		{#if item?.pocketBookCatalogList?.length>0}
		{#each item.pocketBookCatalogList as pocketItem,i}
			<div class="pgcContent {i%2 == 0? 'pgcContentOdd':''}" data-catalogid={pocketItem.catalogId} on:click={()=>gotoMain(pocketItem.catalogId)}>
				<div class="title">{pocketItem.catalogName}</div>
				{#if !!pocketItem.subTitle}
					<div class="subTitle">{pocketItem.subTitle}</div>
				{/if}
				<div class="readCount">
					<span class="count">{_checkNumber(pocketItem.readCount)}阅读</span>
					{#if pocketItem?.tagList?.length> 0}
					{#each pocketItem.tagList as vtag,t}
						{#if vtag?.tagType == 3}
							<div class="updateIos"><span>{vtag.tagName}</span></div>
						{/if}
					{/each}
					{/if}
				</div>
				{#if pocketItem?.tagList?.length> 0}
				{#each pocketItem.tagList as vtag,t}
					{#if vtag.tagType == 1}
						<img class="hot" alt="hot" src="static/index/hot@3x.png"/>
					{:else if vtag.tagType == 2}
						<img class="new" alt="new" src="static/index/new@3x.png"/>
					{/if}
				{/each}
				{/if}
			</div>
		{/each}
		{/if}
	</div>
</div>